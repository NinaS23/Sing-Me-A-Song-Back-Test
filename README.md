
# Sing-Me-A-Song
<div align="center">
	<img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/musical-note_1f3b5.png">
</div>


<p align = "center">
   <img src="https://img.shields.io/badge/author-NinaS23-4dae71?style=flat-square" />
</p>


<div align="center">
  <h3>test Build With</h3>

<img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" height="30px"/>
  
</div>


#  tests developed 
  ### unit and integration tests:
- [x] Users can choose from songs including name and YouTube link
- [x] Users can access the latest registered recommendations
- [x] Users can access the most liked recommendations
- [x] Users can discover new recommendations randomly

<!-- Getting Started -->

# Getting Started

To clone the project, run the following command:

```git
git clone https://github.com/NinaS23/Sing-Me-A-Song-Back-Test.git
```

navigate to the project folder and create .env and .env.test with this inside those files :

```git
- .env
$ PORT = 6003
$ DATABASE_URL = postgres://{user}:{password}@{hostname}:{port}/{database-name};
$ SECRET_KEY = nome_da_chave
$ NODE_ENV='prod'
```

```git
- .env.test
$ PORT = 6003
$ DATABASE_URL = postgres://{user}:{password}@{hostname}:{port}/{database-name-test};
$ SECRET_KEY = nome_da_chave
$ NODE_ENV='test'
```
 then ,run that command to genarate database tables 
```git
 npx prisma migrate dev
```

Then, run the following command to start project:

```git
npm run dev 
```


# tests 

for unit tests , run the command 

```git
npm run test:unit
```
for integration tests, run the command 

```git
npm run test:integration
```
for both of them , run the command :
 ``` git
 npm test
 ```
