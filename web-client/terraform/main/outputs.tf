output "status_health_check_west_id" {
  value = aws_route53_health_check.status_health_check_west[0].id
}

output "status_health_check_east_id" {
  value = aws_route53_health_check.status_health_check_east[0].id
}
