version = 0.1.12

build:
	docker build \
		--build-arg NOTE_URL=https://piano.playbook.dzlab.net/note \
		--build-arg PUBLIC_URL=https://piano.playbook.dzlab.net \
		-t playbook/piano:$(version) .

build.local:
	docker build \
		--build-arg NOTE_URL=http://localhost:20019/note \
		--build-arg PUBLIC_URL=http://localhost:20019 \
		-t playbook/piano:local .

login:
	AWS_PROFILE=dzlab aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 139549850843.dkr.ecr.ap-southeast-1.amazonaws.com

push:
	AWS_PROFILE=dzlab docker push 139549850843.dkr.ecr.ap-southeast-1.amazonaws.com/playbook/piano:$(version)

run:
	docker compose -f docker-compose.local.yml up -d

stop:
	docker compose -f docker-compose.local.yml down --rmi local

tag:
	docker tag playbook/piano:$(version) 139549850843.dkr.ecr.ap-southeast-1.amazonaws.com/playbook/piano:$(version)
