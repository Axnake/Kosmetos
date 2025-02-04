import React, { useEffect, useState } from 'react';
import { fetchSeminars, deleteSeminar, updateSeminar } from './services/api';
import SeminarList from './components/SeminarList';
import EditSeminarModal from './components/EditSeminarModal';

/**
 * Главный компонент приложения.
 * Отвечает за загрузку данных, управление состоянием и взаимодействие с API.
 */
function App() {
  // Состояние для хранения списка семинаров
  const [seminars, setSeminars] = useState([]);
  // Состояние для индикации загрузки
  const [loading, setLoading] = useState(true);
  // Состояние для обработки ошибок
  const [error, setError] = useState(null);
  // Состояние для управления видимостью модального окна редактирования
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Состояние для хранения текущего редактируемого семинара
  const [editingSeminar, setEditingSeminar] = useState(null);

  /**
   * Эффект для загрузки данных при монтировании компонента.
   * Запрашивает данные с сервера и сохраняет их в состояние.
   */
  useEffect(() => {
    const loadSeminars = async () => {
      try {
        const data = await fetchSeminars(); // Загружаем данные с сервера через функцию из api.js
        setSeminars(data); // Сохраняем полученные данные в состояние seminars
      } catch (err) {
        setError(err.message); // Если произошла ошибка, сохраняем сообщение об ошибке
      } finally {
        setLoading(false); // После завершения загрузки устанавливаем loading в false
      }
    };
    loadSeminars(); // Вызываем функцию загрузки данных
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании

  /**
   * Функция для удаления семинара.
   * Отправляет DELETE-запрос на сервер и обновляет состояние.
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this seminar?')) {
      try {
        await deleteSeminar(id); // Удаляем семинар с сервера через функцию из api.js
        setSeminars(seminars.filter((seminar) => seminar.id !== id)); // Удаляем семинар из состояния
      } catch (err) {
        setError(err.message); // Если произошла ошибка, сохраняем сообщение об ошибке
      }
    }
  };

  /**
   * Функция для начала редактирования семинара.
   * Открывает модальное окно и сохраняет текущий семинар в состояние.
   */
  const handleEdit = (seminar) => {
    setEditingSeminar(seminar); // Сохраняем семинар в состояние editingSeminar
    setIsModalOpen(true); // Открываем модальное окно
  };

  /**
   * Функция для сохранения изменений семинара.
   * Отправляет PUT-запрос на сервер и обновляет состояние.
   */
  const handleSave = async (updatedSeminar) => {
    try {
      await updateSeminar(updatedSeminar.id, updatedSeminar); // Обновляем данные на сервере через функцию из api.js
      setSeminars(
          seminars.map((seminar) =>
              seminar.id === updatedSeminar.id ? updatedSeminar : seminar
          )
      ); // Обновляем состояние seminars
      setIsModalOpen(false); // Закрываем модальное окно
    } catch (err) {
      setError(err.message); // Если произошла ошибка, сохраняем сообщение об ошибке
    }
  };

  // Если данные еще загружаются, показываем индикатор загрузки
  if (loading) return <p>Loading...</p>;

  // Если произошла ошибка, показываем сообщение об ошибке
  if (error) return <p>Error: {error}</p>;

  return (
      <div>
        {/* Заголовок страницы */}
        <h1>Seminars</h1>

        {/* Компонент списка семинаров */}
        <SeminarList
            seminars={seminars} // Передаем список семинаров
            onDelete={handleDelete} // Передаем функцию для удаления семинара
            onEdit={handleEdit} // Передаем функцию для редактирования семинара
        />

        {/* Модальное окно для редактирования */}
        {isModalOpen && (
            <EditSeminarModal
                seminar={editingSeminar} // Передаем текущий редактируемый семинар
                onSave={handleSave} // Передаем функцию для сохранения изменений
                onCancel={() => setIsModalOpen(false)} // Передаем функцию для закрытия модального окна
            />
        )}
      </div>
  );
}

export default App;