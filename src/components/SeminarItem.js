// src/components/SeminarItem.js

import React from 'react';

/**
 * Компонент для отображения одного семинара.
 */
const SeminarItem = ({ seminar, onDelete, onEdit }) => {
    return (
        <li style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            {/* Заголовок семинара */}
            <h2>{seminar.title}</h2>
            {/* Описание семинара */}
            <p>{seminar.description}</p>
            {/* Дата и время проведения семинара */}
            <p>
                Date: {seminar.date}, Time: {seminar.time}
            </p>
            {/* Изображение семинара */}
            <img src={seminar.photo} alt={seminar.title} width="200" />
            {/* Кнопки "Edit" и "Delete" */}
            <div>
                <button onClick={() => onEdit(seminar)}>Edit</button> {/* Вызов функции редактирования */}
                <button onClick={() => onDelete(seminar.id)}>Delete</button> {/* Вызов функции удаления */}
            </div>
        </li>
    );
};

export default SeminarItem;