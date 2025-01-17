package authentication

import (
	"github.com/Nerzal/gocloak/v7"
	"github.com/stretchr/testify/mock"

	"github.com/ZupIT/horusec-devkit/pkg/services/grpc/auth/proto"
	mockUtils "github.com/ZupIT/horusec-devkit/pkg/utils/mock"

	authEntities "github.com/ZupIT/horusec-platform/auth/internal/entities/authentication"
)

type Mock struct {
	mock.Mock
}

func (m *Mock) Login(_ *authEntities.LoginCredentials) (*authEntities.LoginResponse, error) {
	args := m.MethodCalled("Login")
	return args.Get(0).(*authEntities.LoginResponse), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) IsAuthorized(_ *authEntities.AuthorizationData) (bool, error) {
	args := m.MethodCalled("IsAuthorized")
	return args.Get(0).(bool), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) GetAccountDataFromToken(_ string) (*proto.GetAccountDataResponse, error) {
	args := m.MethodCalled("GetAccountDataFromToken")
	return args.Get(0).(*proto.GetAccountDataResponse), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) GetUserInfo(_ string) (*gocloak.UserInfo, error) {
	args := m.MethodCalled("GetUserInfo")
	return args.Get(0).(*gocloak.UserInfo), mockUtils.ReturnNilOrError(args, 1)
}
