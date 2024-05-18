import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Button } from '@mui/material';
import { Freelancer } from './Freelancer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useFreelancerContext } from '../context/FreelancerContext';
import EditFreelancerDialog from "../freelancer/EditFreelancer"

const FreelancerList: React.FC = () => {
  const { freelancers, deleteFreelancer, updateFreelancer } = useFreelancerContext()!;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(freelancers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const reorderedFreelancers = items;
    updateFreelancer(reorderedFreelancers);
  };

  const handleDelete = (index: number) => {
    deleteFreelancer(index);
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingFreelancer, setEditingFreelancer] = useState<Freelancer | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOpenEditDialog = (freelancer: Freelancer, index: number) => {
    setEditingFreelancer(freelancer);
    setEditingIndex(index);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingFreelancer(null);
    setEditingIndex(null);
  };

  const handleSaveEdit = (updatedFreelancer: Freelancer) => {
    if (editingIndex !== null) {
      updateFreelancer(updatedFreelancer, editingIndex);
    } else {
      updateFreelancer([...freelancers, updatedFreelancer]);
    }
    handleCloseEditDialog();
  };

  return (
    <Box sx={{ ml: '10%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="freelancers">
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                height: snapshot.isDraggingOver ? 'auto' : '100%',
                overflowY: 'auto',
              }}
            >
              {freelancers.map((freelancer, index) => (
                <Draggable key={index} draggableId={`${index}`} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        height: snapshot.isDragging ? 'auto' : '100%',
                      }}
                    >
                      <FreelancerCard
                        freelancer={freelancer}
                        index={index}
                        onDelete={handleDelete}
                        onEdit={handleOpenEditDialog}
                        isDragging={snapshot.isDragging}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <EditFreelancerDialog
        open={openEditDialog}
        freelancer={editingFreelancer}
        onClose={handleCloseEditDialog}
        onSave={handleSaveEdit}
      />
    </Box>
  );
};

const FreelancerCard: React.FC<{
  freelancer: Freelancer;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (freelancer: Freelancer, index: number) => void;
  isDragging: boolean;
}> = ({
  freelancer,
  index,
  onDelete,
  onEdit,
  isDragging,
}) => {
  const handleEditClick = () => {
    onEdit(freelancer, index);
  };

  return (
    <Box sx={{ mb: '2%' }}>
      <Card
        className="freelancer-card"
        sx={{ width: '95%', height: isDragging ? 'auto' : '100%' }}
      >
        <CardContent sx={{ p: '3%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '2%' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Montserrat', fontWeight: '600' }}>
              {freelancer.firstName} {freelancer.lastName}
            </Typography>
            <Box>
              <IconButton onClick={() => onDelete(index)} color="primary">
                <DeleteIcon />
              </IconButton>
              <Button onClick={handleEditClick} color="primary">
                Edit
              </Button>
            </Box>
          </Box>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default FreelancerList;