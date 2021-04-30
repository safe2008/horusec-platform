package workspace

import (
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"

	mockUtils "github.com/ZupIT/horusec-devkit/pkg/utils/mock"

	roleEntities "github.com/ZupIT/horusec-platform/core/internal/entities/role"
	tokenEntities "github.com/ZupIT/horusec-platform/core/internal/entities/token"
	workspaceEntities "github.com/ZupIT/horusec-platform/core/internal/entities/workspace"
)

type Mock struct {
	mock.Mock
}

func (m *Mock) Create(_ *workspaceEntities.Data) (*workspaceEntities.Response, error) {
	args := m.MethodCalled("Create")
	return args.Get(0).(*workspaceEntities.Response), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) Get(_ *workspaceEntities.Data) (*workspaceEntities.Response, error) {
	args := m.MethodCalled("Get")
	return args.Get(0).(*workspaceEntities.Response), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) Update(_ *workspaceEntities.Data) (*workspaceEntities.Response, error) {
	args := m.MethodCalled("Update")
	return args.Get(0).(*workspaceEntities.Response), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) Delete(_ uuid.UUID) error {
	args := m.MethodCalled("Delete")
	return mockUtils.ReturnNilOrError(args, 0)
}

func (m *Mock) List(_ *workspaceEntities.Data) (*[]workspaceEntities.Response, error) {
	args := m.MethodCalled("List")
	return args.Get(0).(*[]workspaceEntities.Response), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) UpdateRole(_ *roleEntities.Data) (*roleEntities.Response, error) {
	args := m.MethodCalled("UpdateRole")
	return args.Get(0).(*roleEntities.Response), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) InviteUser(_ *roleEntities.UserData) (*roleEntities.Response, error) {
	args := m.MethodCalled("InviteUser")
	return args.Get(0).(*roleEntities.Response), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) GetUsers(_ uuid.UUID) (*[]roleEntities.Response, error) {
	args := m.MethodCalled("GetUsers")
	return args.Get(0).(*[]roleEntities.Response), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) RemoveUser(_ *roleEntities.Data) error {
	args := m.MethodCalled("RemoveUser")
	return mockUtils.ReturnNilOrError(args, 0)
}

func (m *Mock) CreateToken(_ *tokenEntities.Data) (string, error) {
	args := m.MethodCalled("CreateToken")
	return args.Get(0).(string), mockUtils.ReturnNilOrError(args, 1)
}

func (m *Mock) DeleteToken(_ *tokenEntities.Data) error {
	args := m.MethodCalled("DeleteToken")
	return mockUtils.ReturnNilOrError(args, 0)
}

func (m *Mock) ListTokens(_ uuid.UUID) (*[]tokenEntities.Response, error) {
	args := m.MethodCalled("ListTokens")
	return args.Get(0).(*[]tokenEntities.Response), mockUtils.ReturnNilOrError(args, 1)
}