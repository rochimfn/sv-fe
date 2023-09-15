# Test Frontend SV

## Clone Repository

Jalankan perintah berikut untuk clone repository

```bash
git clone https://github.com/rochimfn/sv-fe.git
cd sv-fe
```

## Pasang Dependensi

Pastikan anda telah berada di direktori `sv-fe`
```bash
npm install 
```

## Menjalankan Frontend

Pasang cli quasar dengan perintah berikut

```
npm i -g @quasar/cli
```

Pastikan tidak ada error ketika menjalankan perintah berikut
```
quasar
```

Pastikan service backend telah berjalan [http://localhost:8080/ping](http://localhost:8080/ping) sebelum menjalankan perintah berikut.

```
quasar dev
```

Buka frontend di [http://localhost:9000/#/all](http://localhost:9000/#/all)