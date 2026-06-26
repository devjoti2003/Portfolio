## To Do

- Edit the left edge in-page nav bar to expand on hover, and show labels. Then on clicking labels to scroll to that section.
    - The labels should be hidden on idle, and the container should be transparent
    - The labels should appear on hover, and the container should expand to right
    - Only the vertical line that corresponds to the current section should get colored and the bloom, just how it is right now except the label should not be visible on idle 
    - This also means we can get rid of the section nav items from the nav bar
    - The labels should animate from left to right when hovered just from the side of the vertical lines that already exist

- Remove the revolvement of the dna structure with mouse movement. The rotation on idle and scroll should stay

- The hover effects that make the component rise and enlarge, which makes it translate to -x and scale in y a bit too much.
    - Reduce x translation to a very small amount to keep the animation subtle
    - Reduce y scaling to 0, no need to expand the card.
    - The shadow also needs to increase just a bit to keep it subtle

- Corner Radii is not yet standardized into tokebs.
    - let's have 3 sizes for corner radii: 5px, 10px, 20px. And the 999px stays as pill or xxl whatever suits better.