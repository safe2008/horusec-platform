package enums

const (
	EnvAuthURL                  = "HORUSEC_AUTH_URL"
	EnvAuthType                 = "HORUSEC_AUTH_TYPE"
	EnvDisableEmails            = "HORUSEC_DISABLE_EMAILS"
	EnvEnableApplicationAdmin   = "HORUSEC_ENABLE_APPLICATION_ADMIN"
	EnvApplicationAdminData     = "HORUSEC_APPLICATION_ADMIN_DATA"
	EnvEnableDefaultUser        = "HORUSEC_ENABLE_DEFAULT_USER"
	EnvDefaultUserData          = "HORUSEC_DEFAULT_USER_DATA"
	EnvHorusecManager           = "HORUSEC_MANAGER_URL"
	DuplicatedAccount           = "duplicate key value violates unique constraint"
	DefaultUserData             = "{\"username\": \"dev\", \"email\":\"dev@example.com\", \"password\":\"Devpass0*\"}"
	ApplicationAdminDefaultData = "{\"username\": \"horusec-admin\", \"email\":\"horusec-admin@example.com\"," +
		" \"password\":\"Devpass0*\"}"
)
