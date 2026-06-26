const { chromium } = require('playwright');
const { spawn } = require('child_process');
const http = require('http');

// Helper to wait for the local server to be ready
function waitForServer(port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error(`Timeout waiting for server on port ${port}`));
        return;
      }
      
      const req = http.get(`http://localhost:${port}/`, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve();
        }
      });
      
      req.on('error', () => {
        // Keep retrying
      });
      req.end();
    }, 500);
  });
}

async function runTests() {
  const port = 3009; // Use a custom port to avoid conflicts
  console.log(`Starting Next.js production server on port ${port}...`);
  
  // Start the Next production server in the background
  const server = spawn('npx', ['next', 'start', '-p', port.toString()], {
    stdio: 'inherit',
    shell: true
  });
  
  try {
    // Wait for server to start up
    await waitForServer(port);
    console.log('Server is ready. Launching Playwright browser...');
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1600, height: 1000 });
    
    console.log(`Navigating to http://localhost:${port}/ ...`);
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    
    // Test 1: Title check
    const title = await page.title();
    console.log(`- Page title: "${title}"`);
    if (!title.includes('Devjoti Kundu')) {
      throw new Error(`Unexpected title: ${title}`);
    }
    console.log('✓ Title verification passed!');
    
    // Test 2: Hero connection buttons presence
    const connectionButtons = page.locator('.hero-section .nav-connections-group a');
    const btnCount = await connectionButtons.count();
    console.log(`- Found ${btnCount} hero connection buttons`);
    if (btnCount !== 4) {
      throw new Error(`Expected 4 connection buttons in hero section, found ${btnCount}`);
    }
    console.log('✓ Hero connection buttons verification passed!');

    // Test 3: Navbar elements presence
    const topNav = page.locator('.top-nav');
    const isVisible = await topNav.isVisible();
    console.log(`- Top navbar is visible: ${isVisible}`);
    
    const blogLink = page.locator('.top-nav .nav-blog-link');
    const hasBlogLink = await blogLink.isVisible();
    console.log(`- Top navbar Blog link visible: ${hasBlogLink}`);
    if (!hasBlogLink) {
      throw new Error('Blog link is missing from top nav bar');
    }
    console.log('✓ Navbar Blog link verification passed!');
    
    // Test 4: Container max-width styling check
    const container = page.locator('.posh-container').first();
    const maxWidth = await container.evaluate(el => window.getComputedStyle(el).maxWidth);
    console.log(`- .posh-container max-width: ${maxWidth}`);
    if (maxWidth !== '1500px') {
      throw new Error(`Expected max-width 1500px, got ${maxWidth}`);
    }
    console.log('✓ Container max-width verification passed!');
    
    // Test 5: Scrolled navbar state check
    console.log('Scrolling page down to trigger scrolled state...');
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500); // Wait for transition
    
    const hasScrolledClass = await topNav.evaluate(el => el.classList.contains('scrolled'));
    console.log(`- Top navbar has scrolled class: ${hasScrolledClass}`);
    if (!hasScrolledClass) {
      throw new Error('Scrolled class not applied to navbar after scroll');
    }
    console.log('✓ Navbar scrolled state verification passed!');
    
    // Test 6: Theme Toggling verification
    console.log('Testing theme toggler...');
    const themeBtn = page.locator('.top-nav .theme-toggle').first();
    
    // Get initial state
    const initialDark = await page.evaluate(() => document.body.classList.contains('dark-mode'));
    console.log(`- Initial dark mode state: ${initialDark}`);
    
    // Toggle theme
    await themeBtn.click();
    await page.waitForTimeout(500); // Wait for transition
    const afterClickDark = await page.evaluate(() => document.body.classList.contains('dark-mode'));
    console.log(`- Dark mode state after click: ${afterClickDark}`);
    if (afterClickDark === initialDark) {
      throw new Error('Theme toggle click did not alter body classList');
    }
    
    // Toggle back
    await themeBtn.click();
    await page.waitForTimeout(500);
    const finalDark = await page.evaluate(() => document.body.classList.contains('dark-mode'));
    console.log(`- Dark mode state after second click: ${finalDark}`);
    if (finalDark !== initialDark) {
      throw new Error('Theme toggle failed to revert back to original state');
    }
    console.log('✓ Theme toggler verification passed!');

    // Test 7: Paper Mode toggling via button click
    console.log('Testing Paper Mode toggling via button click...');
    const paperBtn = page.locator('.top-nav .paper-toggle').first();
    
    // Get initial state
    const initialPaper = await page.evaluate(() => document.body.classList.contains('paper-mode'));
    console.log(`- Initial paper mode state: ${initialPaper}`);
    
    // Toggle paper mode via button click
    await paperBtn.click();
    await page.waitForTimeout(500); // Wait for transition
    const afterClickPaper = await page.evaluate(() => document.body.classList.contains('paper-mode'));
    console.log(`- Paper mode state after button click: ${afterClickPaper}`);
    if (afterClickPaper === initialPaper) {
      throw new Error('Paper toggle button click did not alter body classList');
    }
    
    // Check that custom pen-nib cursor element is present when paper mode is active
    const cursorSvgCount = await page.locator('.cursor-dot.paper-cursor svg').count();
    console.log(`- Found ${cursorSvgCount} pen-nib SVGs inside cursor-dot`);
    if (cursorSvgCount !== 1) {
      throw new Error(`Expected exactly 1 pen-nib cursor SVG, found ${cursorSvgCount}`);
    }
    
    // Toggle back via button click
    await paperBtn.click();
    await page.waitForTimeout(500);
    const finalPaper = await page.evaluate(() => document.body.classList.contains('paper-mode'));
    console.log(`- Paper mode state after second button click: ${finalPaper}`);
    if (finalPaper !== initialPaper) {
      throw new Error('Paper toggle button failed to revert back to original state');
    }
    console.log('✓ Paper mode button toggle verification passed!');

    // Test 8: Paper Mode toggling via "P" keybinding
    console.log('Testing Paper Mode toggling via "P" keybinding...');
    await page.keyboard.press('p');
    await page.waitForTimeout(500);
    const afterKeyPaper = await page.evaluate(() => document.body.classList.contains('paper-mode'));
    console.log(`- Paper mode state after pressing "p": ${afterKeyPaper}`);
    if (afterKeyPaper === initialPaper) {
      throw new Error('Pressing "p" key did not alter body classList');
    }
    
    // Revert back via "P" keypress
    await page.keyboard.press('p');
    await page.waitForTimeout(500);
    const finalKeyPaper = await page.evaluate(() => document.body.classList.contains('paper-mode'));
    console.log(`- Paper mode state after second "p" press: ${finalKeyPaper}`);
    if (finalKeyPaper !== initialPaper) {
      throw new Error('Pressing "p" key second time failed to revert back to original state');
    }
    console.log('✓ Paper mode keybinding verification passed!');
    
    console.log('All tests passed successfully!');
    
    await browser.close();
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exitCode = 1;
  } finally {
    console.log('Stopping local server...');
    server.kill();
  }
}

runTests();
