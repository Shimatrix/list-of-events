# Список мероприятий

## Описание

Создай веб-приложение, которое:

- Отображает список мероприятий.
- Валидирует поля ввода.
- Позволяет добавить новое мероприятие с полями: **название** и **дата**.
- Редактирует мероприятия.
- Удаляет мероприятие из списка.

---

## Технические требования

### Frontend

- **React + TypeScript**
- Минимальная стилизация (достаточно стандартных HTML-стилей)
- Используй локальное состояние в React с помощью хука useState для хранения и управления данными о мероприятиях. Без использования внешнего сервера или базы данных.

### Backend

- Не требуется внешнего бэкэнда, все данные хранятся и обрабатываются в локальном состоянии на стороне клиента.

---

## Функционал

Реализуй компонент:

1. **Форма добавления мероприятия**:
   - Поля: название, дата.
   - Кнопка "Добавить".
   - Кнопка "Редактировать".
2. **Список мероприятий**:
   - Отображение мероприятий.
   - Возможность удалить мероприятие (кнопка "Удалить").
   - Возможность редактировать мероприятие (кнопка "Редактировать")

### Требования к функционалу

- После добавления, мероприятие появляется в списке.
- После редактирования, мероприятие изменяет контент внутри себя и остается на прежней позиции в списке.
- После удаления, мероприятие исчезает из списка.

---

## Оценка эквивалентности

- Работа с формой и состоянием.
- Отображение данных в списке.
- Простая логика редактирования.
- Простая логика удаления.

## Структура проекта
```
project-template/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── EventForm.tsx       # Компонент формы для добавления и редактирования мероприятий
│   │   ├── EventList.tsx       # Компонент для отображения списка мероприятий
│   ├── App.tsx                 # Главный компонент, который будет управлять состоянием всех мероприятий
│   ├── index.tsx
│   ├── styles.css
├── .gitignore
├── package.json
├── README.md
```

# Правила сдачи работы

## 1. Форкни репозиторий

- В правом верхнем углу страницы нажми на кнопку **Fork**. Это создаст копию репозитория в твоем аккаунте на GitHub.

## 2. Клонируй форк на свою машину

- После того как форк будет создан, перейди в свой форк на GitHub.
- Нажми на кнопку **Code** и скопируй URL для клонирования репозитория.
- Клонируй репозиторий на свою локальную машину.

## 3. Создай новую ветку

- Перейди в директорию с репозиторием на своей машине.
- Создай новую ветку для своей работы. Это поможет тебе избежать работы в основной ветке.

## 4. Внеси изменения в код

- Открой проект в своем редакторе и внеси необходимые изменения (реализуй функционал).

## 5. Добавь изменения в индекс и сделай коммит

- После внесения изменений добавь их в индекс и сделай коммит с описанием изменений.

## 6. Запушь изменения в свой форк на GitHub

- Отправь свою ветку с изменениями в твой форк на GitHub.

## 7. Создай Pull Request (PR) в этот репозиторий

- Перейди в свой форк на GitHub и ты увидишь уведомление о том, что ветка была запушена с кнопкой **Compare & Pull Request**.
- Нажми на **Compare & Pull Request**.
- В открывшемся окне убедись, что выбран правильный репозиторий для слияния (мой репозиторий) и выбрана правильная ветка (`develop_st1`).
- Добавь описание изменений, которые ты внес, чтобы я мог понять, что было сделано.
- Нажми кнопку **Create Pull Request**.

## 8. Ожидай проверки и слияния PR

- После создания PR я получу уведомление и смогу проверить твои изменения.
- Если все будет в порядке, я смогу смержить твои изменения в основной репозиторий. Если будут замечания, я оставлю комментарии для исправлений.
