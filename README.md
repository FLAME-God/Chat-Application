## ChaterBox

ChatterBox is a Full-Stack App. Usses Socket.io for real time communication and stores user details in sql database PostgreSql.

## Tech Stack

- **server:** node.js, expresss.js
- **client:** React, daisyui, tailwindcss
- **Database:** PostgrSql
- **ORM:** Prisma

## Demo

- signup
  ![signin](/screenshot/signin.png)

## Run Localy

Clone the project

```bash
git clone https://github.com/FLAME-God/Chat-Application
```

go to server

```bash
cd server
```

install dependency

```bash
npm install
```

open another terminal and go to client

```bash
cd client
```

install dependency

```bash
npm install
```

create an env file in server

```dotnetcli
PORT =

JWT_PASSWORD = ""

DATABASE_URL=""

CLOUDE_NAME =
CLOUDE_API_KEY=
CLOUDE_API_SECRATE =
FRONTEND_URL =
```

start the server

```bash
npm run dev
```

go to client

```bash
npm run dev
```

## Features

Authentication
![sigin](/screenshot/signin.png)

![signup](/screenshot/signup.png)

ChatBox
![home](/screenshot/home.png)

settings
![setting](/screenshot/setting.png)

profile
![profile](/screenshot/profile.png)
