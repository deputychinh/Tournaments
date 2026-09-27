resource "aws_secretsmanager_secret" "db_password" {
  name = "${local.name}/db-password"
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = var.db_password
}

resource "aws_secretsmanager_secret" "jwt_access" {
  name = "${local.name}/jwt-access-secret"
}

resource "aws_secretsmanager_secret_version" "jwt_access" {
  secret_id     = aws_secretsmanager_secret.jwt_access.id
  secret_string = var.jwt_access_secret
}

resource "aws_secretsmanager_secret" "jwt_refresh" {
  name = "${local.name}/jwt-refresh-secret"
}

resource "aws_secretsmanager_secret_version" "jwt_refresh" {
  secret_id     = aws_secretsmanager_secret.jwt_refresh.id
  secret_string = var.jwt_refresh_secret
}
