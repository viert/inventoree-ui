FROM cdrx/fpm-centos:7
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install nodejs git

ADD build /src/build
ADD config /src/config
ADD src /src/src
ADD static /src/static
ADD .babelrc /src/.babelrc
ADD .eslintrc.js /src/.eslintrc.js
ADD .eslintignore /src/.eslintignore
ADD index.html /src/index.html
ADD package.json /src/package.json
ADD build.sh /build.sh
ADD .git /src/.git

ENTRYPOINT /build.sh
