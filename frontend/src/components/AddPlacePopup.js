import React, { useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { useForm } from '../hooks/useForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const {values, handleChange, setValues} = useForm({}); 

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    setValues({
      link: '',
      name: ''
    })
  }, [isOpen]);

  return (
    <PopupWithForm
      name='popup_type_card'
      title='Новое место'
      text={isLoading? 'Создаем...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
         <label className='popup__form-info'>
        <input
          type='text'
          name='name'
          id='cardname-input'
          className='popup__input popup__input_type_title'
          placeholder='Название'
          minLength={2}
          maxLength={30}
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className='popup__input-error cardname-input-error' />
        <input
          type='url'
          name='link'
          id='link-input'
          className='popup__input popup__input_type_link'
          placeholder='Ссылка на картинку'
          required
          value={values.link || ''}
          onChange={handleChange}
        />
        <span className='popup__input-error link-input-error' />
      </label>
    </PopupWithForm>
  );
}

export { AddPlacePopup }