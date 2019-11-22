DEPLOY_PATH = staging

.PHONY: clean build deploy

clean:
	gatsby clean

build:
	yarn build

deploy:
	# Sync to remove old files, then upload in batch to cache control headers
	az storage blob sync -c '$$web' -s ./public/ -d $(DEPLOY_PATH) --account-name ${AZURE_STORAGE_ACCOUNT}
	mv public $(DEPLOY_PATH)
	az storage blob upload-batch -d '$$web' -s ./$(DEPLOY_PATH) --content-cache-control 'max-age=864000, public, must-revalidate' --account-name ${AZURE_STORAGE_ACCOUNT}
	az storage blob update -c '$$web' -n $(DEPLOY_PATH)/admin/config.yml --content-type application/x-yaml --account-name ${AZURE_STORAGE_ACCOUNT}
	az cdn endpoint purge -g documenters -n ${AZURE_STORAGE_ACCOUNT} --profile-name ${AZURE_CDN_PROFILE} --content-paths "/*" "/"
