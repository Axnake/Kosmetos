// src/components/SeminarList.js

import React from 'react';
import SeminarItem from './SeminarItem';

/**
 * Компонент для отображения списка семинаров.
 */
const SeminarList = ({ seminars, onDelete, onEdit }) => {
    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {/* Проходим по массиву семинаров и отрисовываем каждый элемент */}
            {seminars.map((seminar) => (
                <SeminarItem
                    key={seminar.id} // Уникальный ключ для каждого элемента
                    seminar={seminar} // Передаем данные семинара
                    onDelete={onDelete} // Передаем функцию удаления
                    onEdit={onEdit} // Передаем функцию редактирования
                />
            ))}
        </ul>
    );
};

export default SeminarList;