/**
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import Styled from './styled';
import { Button, Icon, Pagination } from 'components';
import { PaginationInfo } from 'helpers/interfaces/Pagination';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { kebabCase } from 'lodash';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export interface TableColumn {
  label: string;
  property: string;
  type: 'text' | 'custom' | 'actions';
  cssClass?: string[];
}

export interface Datasource {
  [x: string]: any;
  id?: string | number;
  buttons?: {
    [x: string]: { name: string; size: string; function: () => void };
  };
  actions?: {
    icon: string;
    title: string;
    function: (element?: any) => void;
  }[];
}

interface DatatableInterface {
  columns: TableColumn[];
  datasource: Datasource[];
  total?: number;
  paginate?: {
    pagination: PaginationInfo;
    onChange: (pagination: PaginationInfo) => void;
  };
  emptyListText?: string;
  isLoading?: boolean;
  tooltip?: TooltipProps;
  fixed?: boolean;
  buttons?: {
    title: string;
    icon?: string;
    disabled?: boolean;
    show?: boolean;
    function: (...args: any) => void;
  }[];
}

const Datatable: React.FC<DatatableInterface> = (props) => {
  const {
    columns,
    datasource,
    emptyListText,
    isLoading,
    paginate,
    tooltip,
    fixed = true,
    buttons = [],
  } = props;

  return (
    <>
      <Styled.Wrapper>
        {isLoading ? (
          <Styled.LoadingWrapper>
            <Icon name="loading" size="120px" className="loading" />
          </Styled.LoadingWrapper>
        ) : (
          <>
            <Styled.ButtonWrapper>
              {buttons.map((button, key) =>
                button.show ? (
                  <Button
                    key={key}
                    text={button.title}
                    icon={button.icon}
                    onClick={button.function}
                    width="auto"
                    hidden={button.show}
                  />
                ) : null
              )}
            </Styled.ButtonWrapper>

            <Styled.Table isPaginate={!!paginate} fixed={fixed}>
              <thead>
                <Styled.Head>
                  {columns.map((el, index) => (
                    <Styled.Column key={index}>{el.label}</Styled.Column>
                  ))}
                </Styled.Head>
              </thead>

              <Styled.Body>
                {!datasource || datasource.length <= 0 ? (
                  <tr>
                    <Styled.Cell colSpan={columns.length}>
                      <Styled.EmptyText>{emptyListText}</Styled.EmptyText>
                    </Styled.Cell>
                  </tr>
                ) : (
                  datasource.map((row, dataId) => (
                    <Styled.Row
                      key={`${row.id || 'item'}-${dataId}`}
                      highlight={row['highlight']}
                    >
                      {columns.map((column, columnId) => {
                        const renderTooltipProps = (tip: string) => {
                          return tooltip
                            ? {
                                'data-for': tooltip.id,
                                'data-tip': tip,
                              }
                            : null;
                        };

                        if (column.type === 'text') {
                          return (
                            <Styled.Cell
                              tabIndex={0}
                              key={columnId}
                              className={column.cssClass?.join(' ')}
                              {...renderTooltipProps(row[column.property])}
                            >
                              {row[column.property] || '-'}
                            </Styled.Cell>
                          );
                        }

                        if (column.type === 'custom') {
                          return (
                            <Styled.Cell
                              tabIndex={0}
                              key={columnId}
                              className={column.cssClass?.join(' ')}
                              style={{ overflow: 'visible' }}
                            >
                              {row[column.property]}
                            </Styled.Cell>
                          );
                        }

                        if (column.type === 'actions') {
                          return (
                            <Styled.Cell
                              tabIndex={0}
                              key={columnId}
                              className={column.cssClass?.join(' ')}
                            >
                              {row[column.type].length >= 1 ? (
                                <div className="row">
                                  <PopupState
                                    variant="popover"
                                    popupId={`popup-menu-${dataId}`}
                                  >
                                    {(popupState) => (
                                      <React.Fragment>
                                        <IconButton
                                          {...bindTrigger(popupState)}
                                        >
                                          <MoreHoriz />
                                        </IconButton>
                                        <Menu {...bindMenu(popupState)}>
                                          {row[column.type].map(
                                            (
                                              action: Datasource,
                                              actionId: React.Key
                                            ) => (
                                              <MenuItem
                                                key={actionId}
                                                onClick={() => {
                                                  action.function();
                                                  popupState.close();
                                                }}
                                              >
                                                <Button
                                                  id={`action-${kebabCase(
                                                    action.title
                                                  )}-${columnId}-${dataId}`}
                                                  rounded
                                                  outline
                                                  opaque
                                                  text={action.title}
                                                  width={'100%'}
                                                  height={30}
                                                  icon={action.icon}
                                                />
                                              </MenuItem>
                                            )
                                          )}
                                        </Menu>
                                      </React.Fragment>
                                    )}
                                  </PopupState>
                                </div>
                              ) : (
                                '-'
                              )}
                            </Styled.Cell>
                          );
                        }

                        return null;
                      })}
                    </Styled.Row>
                  ))
                )}
              </Styled.Body>
            </Styled.Table>
            {tooltip ? <ReactTooltip {...tooltip} /> : null}
          </>
        )}
      </Styled.Wrapper>
      {datasource && datasource.length > 0 && paginate ? (
        <Pagination
          pagination={paginate.pagination}
          onChange={paginate.onChange}
        />
      ) : null}
    </>
  );
};

export default Datatable;
