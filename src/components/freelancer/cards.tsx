import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Button, TextField } from '@mui/material';
import { Freelancer } from './Freelancer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';



interface Props {
  freelancers: Freelancer[];
  onDelete: (index: number) => void;
  onEdit: (updatedFreelancer: Freelancer | Freelancer[], index: number) => void;
}

const FreelancerList: React.FC<Props> = ({ freelancers, onDelete, onEdit }) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(freelancers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const reorderedFreelancers = items;
    onEdit(reorderedFreelancers, -1);
  };

  return (
    <Box sx={{ mt: '18%' }}>
      <Typography sx={{ fontSize: '40px', marginBottom: '5%', fontFamily: 'Montserrat', fontWeight: '600' }} color="primary">
        Registered Freelancers
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="freelancers">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {freelancers.map((freelancer, index) => (
                <FreelancerCard
                  key={index}
                  freelancer={freelancer}
                  index={index}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

const FreelancerCard: React.FC<{ freelancer: Freelancer; index: number; onDelete: (index: number) => void; onEdit: (updatedFreelancer: Freelancer, index: number) => void }> = ({
  freelancer,
  index,
  onDelete,
  onEdit,
}) => {
  const [editing, setEditing] = useState(false);
  const [updatedFreelancer, setUpdatedFreelancer] = useState(freelancer);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(updatedFreelancer, index);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setUpdatedFreelancer(freelancer);
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedFreelancer({
      ...updatedFreelancer,
      [name]: name === 'skills' ? value.split(',').map((skill) => skill.trim()) : value,
    });
  };

  return (
    <Draggable key={index} draggableId={`${index}`} index={index}>
      {(provided) => (
        <Box sx={{ mb: '2%' }}>
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="freelancer-card"
            sx={{ width: '95%', height: 'auto' }}
          >
            <CardContent sx={{ p: '3%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '2%' }}>
                {editing ? (
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={updatedFreelancer.firstName}
                    onChange={handleChange}
                    sx={{ mr: '2%', '& .MuiOutlinedInput-root': { '& > fieldset': { border: 'none' } } }}
                  />
                ) : (
                  <Typography variant="h5" sx={{ fontFamily: 'Montserrat', fontWeight: '600' }}>
                    {freelancer.firstName} {freelancer.lastName}
                  </Typography>
                )}
                <Box >
                  <IconButton onClick={() => onDelete(index)} color="primary">
                    <DeleteIcon />
                  </IconButton>
                  {editing ? (
                    <>
                      <Button onClick={handleSaveClick} color="primary" sx={{ mr: '1%' }}>
                        Save
                      </Button>
                      <Button onClick={handleCancelClick} color="secondary" sx={{ ml: '26%' }}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleEditClick} color="primary"  >
                      Edit
                    </Button>
                  )}
                </Box>
              </Box>
              {editing ? (
                <>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={updatedFreelancer.lastName}
                    onChange={handleChange}
                    sx={{ mb: '1%', '& .MuiOutlinedInput-root': { '& > fieldset': { border: 'none' } } }}
                  />
                  <TextField
                    name="age"
                    label="Age"
                    type="number"
                    value={updatedFreelancer.age}
                    onChange={handleChange}
                    sx={{ mb: '1%', '& .MuiOutlinedInput-root': { '& > fieldset': { border: 'none' } } }}
                  />
                  <TextField
                    name="skills"
                    label="Skills"
                    multiline
                    value={updatedFreelancer.skills.join(', ')}
                    onChange={handleChange}
                    sx={{ mb: '1%', '& .MuiOutlinedInput-root': { '& > fieldset': { border: 'none' } } }}
                  />
                </>
              ) : (
                <>
                  <Typography sx={{ mt: '2%', fontFamily: 'Montserrat' }}>
                    <Box component="span" sx={{ fontWeight: '600' }}>
                      Age:
                    </Box>{' '}
                    {freelancer.age}
                  </Typography>
                  <Typography sx={{ mt: '2%', fontFamily: 'Montserrat', whiteSpace: 'normal' }}>
                    <Box component="span" sx={{ fontWeight: '600' }}>
                      Skills:
                    </Box>{' '}
                    {freelancer.skills.join(', ')}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};

export default FreelancerList;
