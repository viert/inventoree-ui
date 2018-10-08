#!/bin/sh
export APPNAME=inventoree-ui
export REPONAME=c7-mntdev-x64
export REPOHOST=pkg.corp.mail.ru
export BUILDROOT=/buildroot
export WWWDIR=$BUILDROOT/var/www/inventoree

npm_dependencies() {
  npm i
}

build() {
  npm run build
}

install() {
  mkdir -p $WWWDIR
  pushd dist
  tar c * | tar x -C $WWWDIR
}

rpm() {
  gitcommit=`git rev-list --tags --max-count=1`
  VERSION=`git describe --tags $gitcommit`
  BUILD=`git rev-list $VERSION.. --count`
  ARCH=noarch

  echo "======= BUILDING RPM PACKAGE ======="
  fpm -s dir -t rpm \
    --name $APPNAME \
    --vendor "Mail.Ru Infrastructure Services" \
    --version ${VERSION} \
    --iteration ${BUILD} \
    --depends nginx \
    --category "Admin/Inventory" \
    --url https://gitlab.corp.mail.ru/p.vorobyov/inventoree-ui \
    --description "InventoreeUI is a SPA frontend for Inventoree" \
    --provides 'config(%{name}) = %{version}-%{release}' \
    --rpm-os linux \
    --architecture ${ARCH} \
    -C ${BUILDROOT}
  export PKGNAME=$APPNAME-${VERSION}-${BUILD}.${ARCH}.rpm
}

pushrpm() {
  rsync "$PKGNAME" mntdev@${REPOHOST}::${REPONAME}/ && echo ${REPONAME} | nc ${REPOHOST} 15222
}

npm_dependencies
build
install
rpm
pushrpm
