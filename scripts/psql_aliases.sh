alias psql="nocorrect noglob psql db_name db_user"
# PATH+=:/opt/infra/bin/
# source additional/configs
export RAILS_DB=$RAILS_ROOT/config/database.yml
if [[ -f $RAILS_DB ]]
then
    export PGHOST=$(sudo     cat $RAILS_DB | yq e .${RAILS_ENV}.host      -)
    export PGUSER=$(sudo     cat $RAILS_DB | yq e .${RAILS_ENV}.username  -)
    export PGPASSWORD=$(sudo cat $RAILS_DB | yq e .${RAILS_ENV}.password  -)
    export REDIS_URL=$(sudo  cat $RAILS_DB | yq e .${RAILS_ENV}.redis_url -)
fi
