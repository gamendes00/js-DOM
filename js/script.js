document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    let snake = [{ x: 0, y: 0 }];
    let food = generateFood();
    let direction = 'right';
    let score = 0;
    let gameInterval;

    function generateFood() {
        const foodX = Math.floor(Math.random() * 15) * 20;
        const foodY = Math.floor(Math.random() * 15) * 20;
        return { x: foodX, y: foodY };
    }

    function draw() {
        board.innerHTML = '';

        // desenho da cobra
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.className = 'snake';
            snakeElement.style.left = segment.x + 'px';
            snakeElement.style.top = segment.y + 'px';
            board.appendChild(snakeElement);
        });

        // desenho da comida
        const foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.left = food.x + 'px';
        foodElement.style.top = food.y + 'px';
        board.appendChild(foodElement);
    }

    function update() {
        const head = { ...snake[0] };

        // posicionamento e direcionamento
        switch (direction) {
            case 'up':
                head.y -= 20;
                break;
            case 'down':
                head.y += 20;
                break;
            case 'left':
                head.x -= 20;
                break;
            case 'right':
                head.x += 20;
                break;
        }

        // colisão da cobra e maçã
        if (head.x === food.x && head.y === food.y) {
            snake.unshift({ ...food });
            food = generateFood();
            score++;
        } else {
            snake.pop();
        }

        // colisão da cobra em no corpo da cobra
        if (checkCollision(head)) {
            clearInterval(gameInterval);
            endGame();
            return;
        }

        snake.unshift(head);
        draw();
    }

    function checkCollision(head) {
        return (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= board.clientWidth ||
            head.y >= board.clientHeight ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    function endGame() {
        const playerName = prompt('Game over! Digite seu nome:');
        alert(`Player: ${playerName}\nScore: ${score}`);
        const playAgain = confirm('Voçê deseja jogar novamente?');
        if (playAgain) {
            resetGame();
        }
    }

    function resetGame() {
        snake = [{ x: 0, y: 0 }];
        food = generateFood();
        direction = 'right';
        score = 0;
        draw();
        gameInterval = setInterval(update, 200);
    }

    // movimentação
    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
        }
    });

    // inicial
    draw();
    gameInterval = setInterval(update, 200);
});
