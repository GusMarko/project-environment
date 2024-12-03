# Cloudfront configuration
resource "aws_cloudfront_origin_access_control" "cdn_oac" {
  name = "CloudFront-project-oac-mg"
  origin_access_control_origin_type = "s3"
  signing_behavior = "always"
  signing_protocol = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled = true
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.s3.bucket_regional_domain_name
    origin_id = aws_s3_bucket.s3.id
    origin_access_control_id = aws_cloudfront_origin_access_control.cdn_oac.id
  }
  
  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.s3.id

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }


  price_class = "PriceClass_All"
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

   viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name = "Project-Cloudfront-s3"
    Environment = "${var.env}"
  }
}