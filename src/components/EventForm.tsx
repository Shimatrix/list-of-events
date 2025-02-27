import { useState, FormEvent, useEffect } from "react";
import { Event } from "../App";
import { nanoid } from "nanoid";

//Типизируем свойства элемента формы добавления и редактирования мероприятия
type EventFormProps = {
  editEventState: Event | null;
  onAdd: (data: Event) => void;
  onChange: (data: Event) => void;
  setEditEventState: (data: Event | null) => void;
};

export const EventForm: React.FC<EventFormProps> = ({
  editEventState,
  onAdd,
  onChange,
  setEditEventState,
}) => {
  //Стейт для хранения данных формы
  const [formData, setFormData] = useState<Pick<Event, "name" | "date">>({
    name: "",
    date: "",
  });

  //Стейт для хранения ошибок формы с последующей валидацией
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});

  //Хук для обработки состояния в случае начала и завершения редактирования мероприятия
  useEffect(() => {
    if (editEventState === null) {
      setFormData({
        name: "",
        date: "",
      });
    } else {
      setFormData({
        name: editEventState.name,
        date: editEventState.date,
      });
      setErrors({});
    }
  }, [editEventState]);

  //Форматирование даты мероприятия для корректного отображения в поле инпут с типом date
  const formatDateToInput = (dateString: string): string => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  //Форматирование даты мероприятия для привычной (ДД.ММ.ГГГГ) записи в стейт
  const formatDate = (inputDate: string) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}.${month}.${year}`;
  };

  //Функция передачи данных формы в стейт
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "date") {
      setFormData({ ...formData, date: formatDate(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  //Функция валидации формы и установки текста ошибки в стейт Error
  const validateForm = () => {
    const newErrors: { name?: string; date?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Название обязательно для заполнения";
    }

    if (formData.name.trim().length < 5) {
      newErrors.name = "Название должно быть длиннее 5 символов";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Дата обязательна для заполнения";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Функция отправки данных формы для случаев добавления или редактирования мероприятия
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (editEventState === null) {
      onAdd({ id: nanoid(8), name: formData.name, date: formData.date });
    } else {
      onChange({
        id: editEventState.id,
        name: formData.name,
        date: formData.date,
      });
    }
    setEditEventState(null);
    setFormData({
      name: "",
      date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form" noValidate>
      <h2>
        {editEventState === null
          ? "Добавить мероприятие"
          : "Редактировать мероприятие"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Название"
        value={formData.name}
        onChange={handleInputChange}
        className={`event-form__input ${errors.name ? "error-input" : ""}`}
      />
      {errors.name && <span className="error-message">{errors.name}</span>}
      <input
        type="date"
        name="date"
        value={formData.date ? formatDateToInput(formData.date) : ""}
        onChange={handleInputChange}
        className={`event-form__input ${errors.name ? "error-input" : ""}`}
      />
      {errors.date && <span className="error-message">{errors.date}</span>}
      <button type="submit" className="event-form__button">
        {editEventState === null ? "Добавить" : "Сохранить"}
      </button>
    </form>
  );
};
