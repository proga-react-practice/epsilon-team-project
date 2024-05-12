import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Button } from '@mui/material';
import { Freelancer } from './Freelancer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import RegistrationForm from './form';

interface Props {
  freelancers: Freelancer[];
  onDelete: (index: number) => void;
  onEdit: (updatedFreelancer: Freelancer | Freelancer[], index: number) => void;
}

const FreelancerList: React.FC<Props> = ({ freelancers, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleEditSubmit = (updatedFreelancer: Freelancer) => {
    if (editIndex !== null) {
      onEdit(updatedFreelancer, editIndex);
      setEditIndex(null);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(freelancers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const reorderedFreelancers = items;
    onEdit(reorderedFreelancers, -1);
  };

  return (
    <Box sx={{ mt: '10%' }}>
      <Typography sx={{ fontSize: '40px', marginBottom: '18px', fontFamily: 'Montserrat', fontWeight: '600' }} color="primary">
        Registered Freelancers
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="freelancers">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {freelancers.map((freelancer, index) => (
                <Draggable key={index} draggableId={`${index}`} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="freelancer-card"
                      sx={{ width: '500px', mb: '24px', height: '180px' }}
                    >
                      <CardContent sx={{ p: 2, display: 'flex' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h5" sx={{ mb: 1, fontFamily: 'Montserrat', fontWeight: '600' }}>
                            Freelancer {index + 1}
                          </Typography>
                          <Typography sx={{ mt: '12px', fontFamily: 'Montserrat' }}>
                            <Box component="span" sx={{ fontWeight: '600' }}>
                              Name:
                            </Box>{' '}
                            {freelancer.firstName} {freelancer.lastName}
                          </Typography>
                          <Typography sx={{ mt: '12px', fontFamily: 'Montserrat' }}>
                            <Box component="span" sx={{ fontWeight: '600' }}>
                              Age:
                            </Box>{' '}
                            {freelancer.age}
                          </Typography>
                          <Typography sx={{ mt: '12px', fontFamily: 'Montserrat', whiteSpace: 'nowrap' }}>
                            <Box component="span" sx={{ fontWeight: '600' }}>
                              Skills:
                            </Box>{' '}
                            {freelancer.skills.join(', ')}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton onClick={() => onDelete(index)} color="primary">
                            <DeleteIcon />
                          </IconButton>
                          <Button onClick={() => handleEditClick(index)} color="primary">
                            Edit
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      {editIndex !== null && (
        <RegistrationForm
          initialValues={freelancers[editIndex]}
          onSubmit={handleEditSubmit}
        />
      )}
    </Box>
  );
};

export default FreelancerList;