$(document).ready(function () {
  var anim_id;
  // saving dom object to variables
  var help = $('#help'),
    scoreDiv = $('#score_div'),
    score = $('#score'),
    container = $('#container'),
    line = $('.line'),
    line_1 = $('#line-1'),
    line_2 = $('#line-2'),
    line_3 = $('#line-3'),
    car = $('#car'),
    car_1 = $('#car_1'),
    car_2 = $('#car_2'),
    car_3 = $('#car_3'),
    restart_div = $('#restart_div'),
    restart_but = $('#restart');
  //saving some initial setup "where this item in document" ,container Dimensions
  var container_left = parseInt(container.css('left'));
  var container_width = parseInt(container.width());
  // var container_width = parseInt(container.css('width')); the same way
  var container_height = parseInt(container.height());
  //mycar Dimensions
  var car_width = parseInt(car.width());
  var car_height = parseInt(car.height());

  //some other declarations
  var game_over = false,
    score_counter = 1,
    speed = 2, //for car
    line_speed = 5, //for line speed to display
    move_right = false,
    move_left = false,
    move_up = false,
    move_down = false;

  /* ------------------------------GAME CODE STARTS HERE------------------------------------------- */
  // move the cars
  $(document).on('keydown', function (e) {
    if (game_over === false) {
      var key = e.keyCode;
      if (key === 37 && move_left === false) {
        move_left = requestAnimationFrame(left);
      } else if (key === 39 && move_right === false) {
        move_right = requestAnimationFrame(right);
      } else if (key === 38 && move_up === false) {
        move_up = requestAnimationFrame(up);
      } else if (key === 40 && move_down === false) {
        move_down = requestAnimationFrame(down);
      }
    }
  });
  $(document).on('keyup', function (e) {
    if (game_over === false) {
      var key = e.keyCode;
      if (key === 37) {
        cancelAnimationFrame(move_left);
        move_left = false;
      } else if (key === 39) {
        cancelAnimationFrame(move_right);
        move_right = false;
      } else if (key === 38) {
        cancelAnimationFrame(move_up);
        move_up = false;
      } else if (key === 40) {
        cancelAnimationFrame(move_down);
        move_down = false;
      }
    }
  });

  function left() {
    if (game_over === false && parseInt(car.css('left')) > 0) {
      car.css('left', parseInt(car.css('left')) - 5);
      move_left = requestAnimationFrame(left);
    }
  }

  function right() {
    if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
      car.css('left', parseInt(car.css('left')) + 5);
      move_right = requestAnimationFrame(right);
    }
  }

  function up() {
    if (game_over === false && parseInt(car.css('top')) > 0) {
      car.css('top', parseInt(car.css('top')) - 3);
      move_up = requestAnimationFrame(up);
    }
  }

  function down() {
    if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
      car.css('top', parseInt(car.css('top')) + 3);
      move_down = requestAnimationFrame(down);
    }
  }
  // repeat
  anim_id = requestAnimationFrame(repeat);

  function repeat() {
    if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
      stop_the_game();
      return;
    }
    score_counter++;
    if (score_counter % 20 == 0) {
      score.text(parseInt(score.text()) + 1);
    }
    if (score_counter % 400 == 0) {
      speed++;
      line_speed = line_speed + 1;
    }
    car_down(car_1);
    car_down(car_2);
    car_down(car_3);

    line_down(line_1);
    line_down(line_2);
    line_down(line_3);

    anim_id = requestAnimationFrame(repeat);
  }


  function car_down(car) {
    var current_top = parseInt(car.css('top'));
    if (current_top > container_height) {
      current_top = -200;
      var car_left = parseInt(Math.random() * (container_width - car_width));
      car.css('left', car_left);
    }
    car.css('top', current_top + speed);
  }

  function line_down(line) {
    var line_current_top = parseInt(line.css('top'));
    if (line_current_top > container_height) {
      line_current_top = -300;
    }
    line.css('top', line_current_top + line_speed);
  }

  function stop_the_game() {
    game_over = true;
    cancelAnimationFrame(anim_id);
    cancelAnimationFrame(move_up);
    cancelAnimationFrame(move_left);
    cancelAnimationFrame(move_down);
    cancelAnimationFrame(move_right);
    restart_but.focus();
    restart_div.slideDown();
  }
   restart_but.click(function () {
    location.reload();

  });
  /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */

  function collision($div1, $div2) {
    var x1 = $div1.offset().left,
      y1 = $div1.offset().top,
      h1 = $div1.outerHeight(true),
      w1 = $div1.outerWidth(true),
      b1 = y1 + h1,
      r1 = x1 + w1,

      x2 = $div2.offset().left,
      y2 = $div2.offset().top,
      h2 = $div2.outerHeight(true),
      w2 = $div2.outerWidth(true),
      b2 = y2 + h2,
      r2 = x2 + w2;
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
      return false;
    return true;
  }

});