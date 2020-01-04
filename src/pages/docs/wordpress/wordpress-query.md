---
title: "WordPress Query"
---

```php
$recipes = new WP_Query();
$args = array(
    'post_type' => 'recipes',
    'showposts' => -1,
);
$recipes->query($args);

while ($recipes->have_posts()) : $recipes->the_post();
    ?>
    <div class="recipe">
        <a href="<?php echo get_the_permalink();?>"><?php echo get_the_title();?></a>
        <small class="date"><?php echo get_the_date();?></small>
    </div>
    <?php
endwhile;
wp_reset_postdata();
```