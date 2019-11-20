.PHONY: clean build deploy

clean:
	gatsby clean

build:
	yarn build

# TODO: Set cache-control headers, set content encoding gzip
deploy:
	az storage blob sync -c '$$web' -s ./public/ -d 'staging' --account-name ${AZURE_STORAGE_ACCOUNT}
	az storage blob upload -f ./public/admin/config.yml -c '$$web' -n staging/admin/config.yml --content-type application/x-yaml --account-name ${AZURE_STORAGE_ACCOUNT}
	az cdn endpoint purge -g documenters -n ${AZURE_STORAGE_ACCOUNT} --profile-name ${AZURE_CDN_PROFILE} --content-paths "/*"
