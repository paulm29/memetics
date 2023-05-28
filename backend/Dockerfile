# mvn clean package docker:build docker:push -debug
# then
#heroku login (page will open)
#docker tag paulm29/memetics registry.heroku.com/memetics/web
#docker push registry.heroku.com/memetics/web
#heroku container:release web --app=memetics
FROM    openjdk:8-jdk-alpine
VOLUME  /tmp
ARG     VERSION_JAR=target/memetics-backend-0.0.1-SNAPSHOT.jar
ARG     PORT=8080
COPY    ${VERSION_JAR} app.jar
#ENV     JAR=${VERSION_JAR}

ENV     ENV_OPTS "-Dlog.path=/tmp"
ENV     JAVA_OPTS "-Xmx512m -Duser.timezone=Australia/Brisbane"

EXPOSE  $PORT
CMD     java -jar $ENV_OPTS $JAVA_OPTS -jar app.jar

#https://spring.io/guides/gs/spring-boot-docker/
#https://www.callicoder.com/spring-boot-docker-example/
#https://www.baeldung.com/dockerizing-spring-boot-application
## https://dzone.com/articles/running-spring-boot-in-a-docker-container
#https://stackabuse.com/dockerizing-a-spring-boot-application/

#FROM openjdk:8-jdk-alpine
#VOLUME /tmp
#ARG JAR_FILE
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]