// src/components/EditSeminarModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';

// Устанавливаем корневой элемент для модального окна
Modal.setAppElement('#root');

/**
 * Компонент модального окна для редактирования семинара.
 */
const EditSeminarModal = ({ seminar, onSave, onCancel }) => {
    // Локальное состояние для хранения данных формы
    const [formData, setFormData] = useState({ ...seminar });

    /**
     * Обработчик изменения полей формы.
     * Обновляет локальное состояние при вводе данных.
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Обновляем соответствующее поле
    };

    /**
     * Обработчик отправки формы.
     * Вызывает функцию onSave с обновленными данными.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        onSave(formData); // Передаем обновленные данные в родительский компонент
    };

    return (
        <Modal isOpen={true} onRequestClose={onCancel}>
            <form onSubmit={handleSubmit}>
                {/* Поле для редактирования заголовка */}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                {/* Поле для редактирования описания */}
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                {/* Поле для редактирования даты */}
                <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Date"
                />
                {/* Поле для редактирования времени */}
                <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="Time"
                />
                {/* Поле для редактирования ссылки на изображение */}
                <input
                    type="text"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                    placeholder="Photo URL"
                />
                {/* Кнопка сохранения изменений */}
                <button type="submit">Save</button>
                {/* Кнопка отмены редактирования */}
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default EditSeminarModal;