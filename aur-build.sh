#!/bin/bash


prepare_workdir()
{
	# Pull the current release
	git clone https://aur.archlinux.org/devrantron.git
	
	# Being safe is important
	mv devrantron devrantron_aur
	cd devrantron_aur
}

get_version_strings()
{
	OLD_PACKAGE_VERSION=$(cat PKGBUILD| grep "pkgver=" | sed s/'pkgver='//g )
	PACKAGE_VERSION=$(curl https://raw.githubusercontent.com/tahnik/devRantron/master/package.json | jq -r ".version")
	OLD_BUILD_NUMBER=$(cat PKGBUILD| grep "pkgrel=" | sed s/'pkgrel='//g )
	BUILD_NUMBER=$((OLD_BUILD_NUMBER+1))
}

message(){
	if [[ "$PACKAGE_VERSION" == "$OLD_PACKAGE_VERSION" ]]; then
		echo "Cannot build for the same version!"
		echo "$PACKAGE_VERSION = $OLD_PACKAGE_VERSION"
		cleanup	
		exit 0
	else
		echo "Building for version ${PACKAGE_VERSION}, replacing ${OLD_PACKAGE_VERSION}!"
	fi
}

patching_pkgbuild(){
	# Replace with new version
	sed -i "s/${OLD_PACKAGE_VERSION}/${PACKAGE_VERSION}/g" PKGBUILD
	sed -i "s/pkgrel=${OLD_BUILD_NUMBER}/pkgrel=${BUILD_NUMBER}/g" PKGBUILD
}

updating_srcinfo()
{
	makepkg --printsrcinfo > .SRCINFO
}

pushing()
{
	git init
	git add .
	git commit -m "Update ${BUILD_NUMBER}"
	git push
}

pause(){
	read -n1 -r -p "Press any key to continue..." key
}

cleanup(){
	cd ..
	rm -rf devrantron_aur
}

run()
{
	prepare_workdir
	get_version_strings
	message
	patching_pkgbuild
	updating_srcinfo
	pushing
	#pause
	cleanup
}

run