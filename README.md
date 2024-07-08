One-time Links Service

Этот проект представляет собой сервис для создания одноразовых ссылок, разработанный с использованием NestJS, Prisma и Docker.

Особенности
NestJS: Прогрессивный фреймворк для Node.js, предназначенный для создания эффективных, надежных и масштабируемых серверных приложений.
Prisma: Современный инструмент ORM для Node.js и TypeScript, интегрирующийся с вашей базой данных и генерирующий типобезопасный конструктор запросов.
Docker: Платформа контейнеризации для упаковки и запуска приложений в изолированных средах.
Docker Compose: Инструмент для определения и управления многоконтейнерными Docker-приложениями.
Требования
Node.js (v16 или выше)
Docker и Docker Compose

Начало работы

Клонирование репозитория
```bash
git clone https://github.com/Georgy27/onetime-link.git
cd onetime-link
```


Установка зависимостей
```bash
npm install
```
Настройка переменных окружения
Создайте файл .env в корне проекта со следующими переменными окружения:

```dotenv
# PostgreSQL Configuration
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name
POSTGRES_PORT=5432

# Application Configuration
BASE_URL=http://localhost
BASE_PORT=3000
```

Замените значения your_postgres_user, your_postgres_password, your_database_name на ваши реальные данные.

Запуск с использованием Docker Compose

Убедитесь, что Docker работает на вашем компьютере. Затем выполните следующие команды для сборки и запуска приложения:

```bash
docker-compose up --build 
docker-compose up -d
```
Эти команды создадут Docker-образы и запустят контейнеры в фоновом режиме.

Особенности Prisma
Применение миграций: После запуска контейнеров выполните миграции Prisma для применения изменений в схеме базы данных:

```bash
docker-compose exec app npx prisma migrate deploy
```

Prisma Studio: Для управления данными в базе данных используйте Prisma Studio:

```bash
docker-compose exec app npx prisma studio
```
Доступ к приложению
После запуска приложение будет доступно по адресу http://localhost:3000.

Дополнительная информация
NestJS Documentation: https://nestjs.com/docs
Prisma Documentation: https://www.prisma.io/docs
Docker Documentation: https://docs.docker.com/
Docker Compose Documentation: https://docs.docker.com/compose/

Лицензия
Этот проект лицензирован по лицензии MIT - см. файл LICENSE для подробностей.
