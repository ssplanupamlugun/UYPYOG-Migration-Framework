# =========================
# BUILD STAGE
# =========================
FROM maven:3.9.11-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Clean and build WAR
RUN mvn clean package -DskipTests


# =========================
# RUNTIME STAGE
# =========================
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy generated WAR
COPY --from=builder /app/target/*.war app.war

EXPOSE 8000

# Start Spring Boot WAR
ENTRYPOINT ["java", "-jar", "app.war"]