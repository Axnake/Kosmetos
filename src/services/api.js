// Базовый URL для API (json-server работает на порту 3001)
const API_URL = 'http://localhost:3001/seminars';

/**
 * Функция для получения списка семинаров с сервера.
 * Использует HTTP-запрос GET.
 */
export const fetchSeminars = async () => {
    try {
        const response = await fetch(API_URL); // Отправляем GET-запрос на сервер
        if (!response.ok) throw new Error('Failed to fetch seminars'); // Проверяем успешность запроса
        return response.json(); // Преобразуем ответ в JSON и возвращаем данные
    } catch (error) {
        throw error; // Передаем ошибку дальше для обработки в компоненте
    }
};

/**
 * Функция для удаления семинара с сервера.
 * Использует HTTP-запрос DELETE.
 */
export const deleteSeminar = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' }); // Отправляем DELETE-запрос
        if (!response.ok) throw new Error('Failed to delete seminar'); // Проверяем успешность запроса
    } catch (error) {
        throw error; // Передаем ошибку дальше для обработки в компоненте
    }
};

/**
 * Функция для обновления данных семинара на сервере.
 * Использует HTTP-запрос PUT.
 */
export const updateSeminar = async (id, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT', // Отправляем PUT-запрос
            headers: { 'Content-Type': 'application/json' }, // Указываем, что отправляем JSON
            body: JSON.stringify(updatedData), // Преобразуем данные в JSON
        });
        if (!response.ok) throw new Error('Failed to update seminar'); // Проверяем успешность запроса
        return response.json(); // Возвращаем обновленные данные
    } catch (error) {
        throw error; // Передаем ошибку дальше для обработки в компоненте
    }
};