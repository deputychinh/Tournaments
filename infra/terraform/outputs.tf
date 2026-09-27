output "alb_dns_name" {
  description = "Public URL of the application (HTTP)"
  value       = "http://${aws_lb.main.dns_name}"
}

output "ecr_api_repository_url" {
  value = aws_ecr_repository.api.repository_url
}

output "ecr_web_repository_url" {
  value = aws_ecr_repository.web.repository_url
}

output "rds_endpoint" {
  value = aws_db_instance.mysql.address
}

output "redis_endpoint" {
  value = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}
