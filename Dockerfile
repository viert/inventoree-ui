FROM cdrx/fpm-centos:7
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install nodejs git nmap-ncat

ADD package.json /src/package.json
ADD package-lock.json /src/package-lock.json
WORKDIR /src
RUN npm i

ADD build /src/build
ADD config /src/config
ADD .babelrc /src/.babelrc
ADD .eslintrc.js /src/.eslintrc.js
ADD .postcssrc.js /src/.postcssrc.js
ADD .eslintignore /src/.eslintignore
ADD static /src/static
ADD index.html /src/index.html
ADD src /src/src
ADD build.sh /build.sh
ADD .git /src/.git

ENTRYPOINT /build.sh
