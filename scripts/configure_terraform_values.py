import os
import shutil


ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY_ID")
SECRET_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.environ.get("AWS_REGION")


def main():
    curr_env = get_Environment()
    replace_placeholders(curr_env)

def replace_placeholders(curr_env):
    aws_region = AWS_REGION
    access_key = ACCESS_KEY
    secret_key = SECRET_KEY
    env = curr_env
    tfvars_path = "../iac/terraform.tfvars"
    backend_path = "../iac/provider.tf"

    with open (tfvars_path, "r") as f:
        tfvars = f.read()
    tfvars = tfvars.replace("access_key_placeholder", str(access_key))
    tfvars = tfvars.replace("secret_key_placeholder", str(secret_key))
    tfvars = tfvars.replace("env_placeholder", str(env))
    tfvars = tfvars.replace("aws_region_placeholder", str(aws_region))
    with open(tfvars_path, "w") as f:
        f.write(tfvars)

    with open(backend_path, "r") as f:
        backend_config = f.read()
    backend_config = backend_config.replace("access_key_placeholder", str(access_key))
    backend_config = backend_config.replace("secret_key_placeholder", str(secret_key))
    backend_config = backend_config.replace("aws_region_placeholder", str(aws_region))
    with open(backend_path, "w") as f:
        f.write(backend_config)


def get_environment():
    env_name = os.environ.get("GITHUB_BASE_REF", "")
    env_name_parts = env_name.split("/")
    env_name = env_name_parts[-1]

    return env_name

########## START ##########
if __name__ == "__main__":
    main()