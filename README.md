# Стажировка Itransition, Финальный проект

***Внимание***
Проект размещен на бесплатном хостинге render.com. Поэтому в связи с особенностью хостинга первое подключение к серверу после перерыва/простоя (как минимум 30 минут) сопровождается долгим ожиданием (от 30 сек. и более). Просьба ожидать завершения первоначального подключения

## Общее описание приложения.

Данное веб-приложение представляет собой сайт с обзорами на книги, фильмы, игры и прочие произведения культуры.<br/>

Приложение доступно в следующих состояниях:

1. Неаутентифицированным ползователям доступно:
 - просмотр обзоров (главная страница со списком обзоров и страница отдельного обзора);
 - поиск по запросу;
 - поиск по тегам;
 - сортировка постов по последней дате или лучшей оценке от автора обзора.

2. Аутентифицированные пользователи могут помимо просмотра контента:
  - создавать обзоры, добавляя теги, собственную оценку произведения и изображение. Предусмотрена валидация форм по наименьшему количеству символов;
  - редактировать, удалять созданные обзоры в личном кабинете; 
  - ставить рейтинг произведениям на обзорах (высчитывается средний рейтинг произведения и выводится рядом с названием произведения в обзоре);
  - ставить "лайки" обзору (полученные "лайки" суммируются и выводятся рядом с именем автора);
  - оставлять комментарии под обзорами (комментарии подгружаются в режиме реального времени).

3. Администраторы могут выполнять те же действия, что и обычные пользователи, а также:
  - удалять других пользователей (с удалением пользователя удаляются созданные им обзоры и оставленные комментарии);
  - блокировать/разблокировать пользователей (заблокированный пользователь при входе получает уведомление о блокировке. При попытке совершить какое-либо действие помимо просмотра вновь получает уведомление о блокировке);
  - назначать права администратора другим пользователям и снимать права администратора с других пользователей (все администраторы равны в правах, поэтому новый администратор может заблокировать или снять данные права с первоначально созданного администратора);
  - заходить в личный кабинет выбранного пользователя и от его имени удалять, редактировать существующие обзоры или создавать новые.

## Реализованные особенности приложения.

Аутентификация выполнена с помощью технологии Single Sing-On (SSO) с использованием социальных сетей Google и Vkontakte.

Приложение поддерживает русский и английский языки интерфейса (выбор пользователя сохраняется в local storage)<br/>
Приложение поддерживает светлую и темную темы интерфейса (выбор пользователя сохраняется в local storage)<br/>

Реализован InfiniteScroll (динамическая пагинация).

Реализован полнотекстовый поиск по обзорам средствами базы данных PostgreSQL (поиск ведется по названию обзора, названию произведения, категории, текста, тегов и комментариев).
Реализована сортировка постов по последней дате и по лучшей авторской оценке средствами БД.
Реализован поиск по тегу.

Изображения хранятся в облачном хранилище.

## Описание стэка используемых технологий и библиотек.  

Фронтенд часть приложения выполнена с помощью:<br/>
  - фреймворка [ReactJS](https://reactjs.org/);
  - CSS-фреймворка [Material UI](https://mui.com/);
  - менеджера состояний [ReduxJS](https://redux.js.org/) и библиотеки [redux-persist](https://github.com/rt2zz/redux-persist#readme) для хранения состояний в local storage.

Серверная часть приложения выполнена с помощью:<br/>
  - [NodeJS](https://nodejs.org/en/) и фреймворка [ExpressJS](https://expressjs.com/).

База данных реализована с помощью:<br/>
  - [PostgreSQL](https://www.postgresql.org/) и ORM [Sequelize](https://sequelize.org/).

Аутентификация реализована с помощью библиотеки [PassportJS](https://www.passportjs.org/).  

Использованы следующие библиотеки:
  - [i18next](https://www.i18next.com/) для интернационализации интерфейса (смена языков);
  - [date-fns](https://date-fns.org/) для манипуляций со временем и датами;
  - [cloudinary](https://cloudinary.com/) для облачного хранения изображений. 
 

Проект доступен по [ссылке](https://review-website-frontend.onrender.com)

PS: Проект размещен на бесплатном хостинге render.com. Поэтому в связи с особенностью хостинга первое подключение к серверу после перерыва (как минимум 30 минут) сопровождается долгим ожиданием (от 30 сек. и более). Просьба ожидать завершения первоначального подключения

