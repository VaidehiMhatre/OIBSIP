let todos = [];
        let completedTodos = [];

        function addTodo() {
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const error = document.getElementById('error');

            if (!description) {
                error.textContent = 'Please fill out this field.';
                return;
            }

            error.textContent = '';
            todos.push({ title, description });
            renderTodos();
            clearInputs();
        }

        function deleteTodo(index) {
            todos.splice(index, 1);
            renderTodos();
        }

        function completeTodo(index) {
            const completedTodo = todos.splice(index, 1)[0];
            completedTodos.push(completedTodo);
            renderTodos();
        }

        function renderTodos() {
            const activeTodos = document.getElementById('activeTodos');
            const completedTodosList = document.getElementById('completedTodos');
            activeTodos.innerHTML = '';
            completedTodosList.innerHTML = '';

            todos.forEach((todo, index) => {
                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item';
                todoItem.innerHTML = `
                    <div>
                        <strong>${todo.title}</strong>
                        <p>${todo.description}</p>
                    </div>
                    <div class="todo-actions">
                        <button class="complete-btn" onclick="completeTodo(${index})">Complete</button>
                        <button class="delete-btn" onclick="deleteTodo(${index})">X</button>
                    </div>
                `;
                activeTodos.appendChild(todoItem);
            });

            completedTodos.forEach((todo) => {
                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item completed';
                todoItem.innerHTML = `
                    <div>
                        <strong>${todo.title}</strong>
                        <p>${todo.description}</p>
                    </div>
                `;
                completedTodosList.appendChild(todoItem);
            });
        }

        function clearInputs() {
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
        }