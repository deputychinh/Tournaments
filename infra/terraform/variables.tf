variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "ap-southeast-1"
}

variable "project" {
  description = "Short project name used as a prefix for all resources"
  type        = string
  default     = "esports-tournament"
}

variable "environment" {
  description = "Deployment environment name (e.g. staging, production)"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.20.0.0/16"
}

variable "az_count" {
  description = "Number of availability zones to spread subnets across"
  type        = number
  default     = 2
}

variable "db_name" {
  type    = string
  default = "esports"
}

variable "db_username" {
  type    = string
  default = "esports"
}

variable "db_password" {
  description = "Master password for the RDS MySQL instance"
  type        = string
  sensitive   = true
}

variable "db_instance_class" {
  type    = string
  default = "db.t4g.micro"
}

variable "redis_node_type" {
  type    = string
  default = "cache.t4g.micro"
}

variable "jwt_access_secret" {
  type      = string
  sensitive = true
}

variable "jwt_refresh_secret" {
  type      = string
  sensitive = true
}

variable "api_image_tag" {
  description = "Docker image tag to deploy for the API service"
  type        = string
  default     = "latest"
}

variable "web_image_tag" {
  description = "Docker image tag to deploy for the web service"
  type        = string
  default     = "latest"
}

variable "api_container_port" {
  type    = number
  default = 3001
}

variable "web_container_port" {
  type    = number
  default = 3000
}

variable "api_desired_count" {
  type    = number
  default = 2
}

variable "web_desired_count" {
  type    = number
  default = 2
}
