import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Spin, Alert, Empty } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { mockDispatchVehicles, mockPipelineColumns } from '../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const CrmPipelinePage = ({ isDark }) => {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/crm/dispatch/pipeline
  // Expected Data: Array of dispatch objects with pipelineStatus field
  useEffect(() => {
    const loadPipelineData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Filter dispatches that have pipelineStatus
        const pipelineDispatches = mockDispatchVehicles.filter(vehicle =>
          vehicle.pipelineStatus && ['new_dispatch', 'in_transit', 'at_warehouse', 'pending_payment'].includes(vehicle.pipelineStatus)
        );

        setDispatches(pipelineDispatches);
        setError(null);
      } catch (err) {
        setError(t('failed_to_load_pipeline_data'));
        console.error('Error loading pipeline data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPipelineData();
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Get the new status from the destination column
    const newStatus = mockPipelineColumns[destination.droppableId]?.status;

    if (!newStatus) {
      console.error('Invalid destination column:', destination.droppableId);
      return;
    }

    // TODO-FX: Implement API call to persist status change.
    // API Endpoint: PUT /api/crm/dispatch/{draggableId}/status
    // Request Body: { newStatus: newStatus }
    console.log(`Moving dispatch ${draggableId} to status: ${newStatus}`);

    // Update local state
    setDispatches(prevDispatches =>
      prevDispatches.map(dispatch =>
        dispatch.id === draggableId
          ? { ...dispatch, pipelineStatus: newStatus }
          : dispatch
      )
    );
  };

  const getDispatchesByStatus = (status) => {
    return dispatches.filter(dispatch => dispatch.pipelineStatus === status);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" tip={t('loading_pipeline')} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message={t('error')}
        description={error}
        type="error"
        showIcon
        style={{ margin: '24px' }}
      />
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>
        {t('dispatch_pipeline')}
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={[16, 16]}>
          {Object.values(mockPipelineColumns).map((column) => {
            const columnDispatches = getDispatchesByStatus(column.status);

            return (
              <Col key={column.id} xs={24} md={12} lg={6}>
                <Card
                  title={t(column.title.toLowerCase().replace(/\s+/g, '_'))}
                  style={{
                    height: '600px',
                    overflow: 'hidden',
                    border: isDark ? '1px solid #434343' : '1px solid #d9d9d9'
                  }}
                  bodyStyle={{ height: '520px', overflowY: 'auto', padding: '8px' }}
                >
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          minHeight: '480px',
                          backgroundColor: snapshot.isDraggingOver
                            ? (isDark ? '#262626' : '#fafafa')
                            : 'transparent',
                          padding: '8px',
                          borderRadius: '4px'
                        }}
                      >
                        {columnDispatches.length === 0 ? (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={t('no_dispatches_in_this_stage')}
                            style={{ marginTop: '100px' }}
                          />
                        ) : (
                          columnDispatches.map((dispatch, index) => (
                            <Draggable
                              key={dispatch.id}
                              draggableId={dispatch.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    marginBottom: '8px'
                                  }}
                                >
                                  <Card
                                    size="small"
                                    style={{
                                      boxShadow: snapshot.isDragging
                                        ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                                        : '0 1px 3px rgba(0, 0, 0, 0.12)',
                                      border: snapshot.isDragging
                                        ? '2px solid #1890ff'
                                        : (isDark ? '1px solid #434343' : '1px solid #d9d9d9'),
                                      cursor: 'grab',
                                      backgroundColor: isDark ? '#1f1f1f' : '#fff'
                                    }}
                                  >
                                    <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                                      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                        VIN: {dispatch.vin}
                                      </div>
                                      <div style={{ marginBottom: '4px' }}>
                                        {dispatch.vehicleInfo.year} {dispatch.vehicleInfo.make} {dispatch.vehicleInfo.model}
                                      </div>
                                      <div style={{ color: '#52c41a', fontWeight: 'bold' }}>
                                        ${dispatch.price?.toLocaleString() || 'N/A'}
                                      </div>
                                      <div style={{ marginTop: '4px', fontSize: '11px', color: '#8c8c8c' }}>
                                        {dispatch.auction} • {dispatch.warehouse}
                                      </div>
                                    </div>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card>
              </Col>
            );
          })}
        </Row>
      </DragDropContext>
    </div>
  );
};

CrmPipelinePage.propTypes = {
  isDark: PropTypes.bool
};

export default CrmPipelinePage;
