# postelf

> a web based solution mail server/client based on postfix

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3, 4.
1. Make sure all the following packages are installed. If installing on a fresh centos/redhat system, the following commands could be used.
    ```
    sudo yum install -y libdb openssl cyrus-sasl postgresql postgresql-server postgresql-contrib postfix dovecot dovecot-pgsql cyrus-sasl cyrus-sasl-plain cyrus-sasl-sql gcc-c++ make
    curl -sL https://rpm.nodesource.com/setup_8.x | sudo -E bash -
    sudo yum install -y nodejs
    ```
2. Install postelf
    ```
    cd path/to/postelf; 
    npm install postelf
    cd ./node_modules/postelf/
    npm start
    ```
3. Install your dependencies

    ```
    cd path/to/postelf; npm install postelf
    ```

4. Start your app

    ```
    cd ./node_modules/postelf/
    npm start
    visit http://xx.xx.xx.xx:3030 and it will show the installation wizard for postelf.
    currently only the installation wizard is completed, it will give you a fully functioned mail server (smtp with tls + pop3/imap with ssl).
    more admin functions still under development
    ```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
