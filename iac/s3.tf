# S3 bucket  
resource "aws_s3_bucket" "s3" {
  bucket = "project-environment-s3-mg"

  tags = {
    Name        = "Project S3 Bucket-Cloudfront hosting"
    Environment = "${var.env}"
  }
}

# website configuration / cloudfront will do the same
resource "aws_s3_bucket_website_configuration" "s3_web" {
  bucket = aws_s3_bucket.s3.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# allowing access to s3 objects
resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.s3.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "AllowGetObjects"
    Statement = [
      {
        Sid       = "AllowPublic"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.s3.arn}/**"
      }
    ]
  })
}

# Putting objects into s3 / if this doesnt work/ we will manually 
resource "aws_s3_object" "object" {
  bucket = aws_s3_bucket.s3.id

  for_each = fileset("website/", "**/*.*")

  key          = each.value
  source       = "website/${each.value}"
}



# Allow access to s3 from cloudfront
data "aws_iam_policy_document" "s3_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.s3.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cdn.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "s3_bucket_policy" {
  bucket = aws_s3_bucket.s3.id
  policy = data.aws_iam_policy_document.s3_bucket_policy.json
}
