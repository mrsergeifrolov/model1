'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // В реальном проекте здесь будет отправка данных на сервер
      console.log('Form data:', data);
      
      // Имитация задержки отправки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm">
      {isSubmitted ? (
        <div className="text-center py-8">
          <h3 className="text-2xl font-serif mb-4">Спасибо за ваше сообщение!</h3>
          <p className="mb-6">Мы свяжемся с вами в ближайшее время.</p>
          <button
            className="btn btn-primary"
            onClick={() => setIsSubmitted(false)}
          >
            Отправить еще одно сообщение
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Имя
            </label>
            <input
              id="name"
              type="text"
              className={`w-full p-3 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-primary`}
              {...register('name', { required: 'Имя обязательно' })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full p-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-primary`}
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Неверный формат email',
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium">
              Тема
            </label>
            <input
              id="subject"
              type="text"
              className={`w-full p-3 border ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-primary`}
              {...register('subject', { required: 'Тема обязательна' })}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Сообщение
            </label>
            <textarea
              id="message"
              rows={5}
              className={`w-full p-3 border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-primary`}
              {...register('message', {
                required: 'Сообщение обязательно',
                minLength: {
                  value: 10,
                  message: 'Сообщение должно содержать не менее 10 символов',
                },
              })}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-500 border border-red-100 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 