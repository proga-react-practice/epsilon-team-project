import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Button, Menu, MenuItem, TextField } from '@mui/material';
import { Freelancer } from '../utils/Freelancer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useFreelancerContext } from '../../context/FreelancerContext';
import EditFreelancerDialog from "./EditFreelancer"
import AddOrderForm from '../../customer/AddOrderForm';
import Dialog from '@mui/material/Dialog';
import { Project } from '../../customer/Utils';
import ProposalList from '../utils/PropsalList';
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ProposalContext } from '../../context/PropsalContext';
import { useContext } from 'react';

const useProposalContext = () => useContext(ProposalContext);

const FreelancerList: React.FC = () => {
  const { freelancers, deleteFreelancer, updateFreelancer } = useFreelancerContext()!;
  const { proposals, addProposal } = useProposalContext()!;

  const [searchSkills, setSearchSkills] = useState('');

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

  const filteredFreelancers = freelancers.filter(freelancer =>
    freelancer.skills.some(skill =>
      skill.toLowerCase().includes(searchSkills.toLowerCase())
    )
  );

  return (
    <Box sx={{ ml: '10%' }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Enter the skills that interest you"
          value={searchSkills}
          onChange={e => setSearchSkills(e.target.value)}
          sx={{ width: '90%' }}
        />
      </Box>
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
              {filteredFreelancers.map((freelancer, index) => (
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
                        proposals={proposals[freelancer.id] || []}
                        addProposal={addProposal}
                        freelancerId={freelancer.id}
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

interface FreelancerCardProps {
  freelancer: Freelancer;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (freelancer: Freelancer, index: number) => void;
  isDragging: boolean;
  proposals: Project[];
  addProposal: (freelancerId: string, proposal: Project) => void;
  freelancerId: string;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({
  freelancer,
  index,
  onDelete,
  onEdit,
  isDragging,
  proposals,
  addProposal,
  freelancerId,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [showProposals, setShowProposals] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditClick = () => {
    onEdit(freelancer, index);
  };

  const handleOfferJobClick = () => {
    handleOpenModal();
  };

  const handleAddProposal = (newProposal: Project) => {
    addProposal(freelancerId, newProposal);
  };

  const handleShowProposals = () => {
    setShowProposals(true);
  };

  const handleCloseProposals = () => {
    setShowProposals(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mb: '2%', position: 'relative' }}>
      <Card
        className="freelancer-card"
        sx={{ width: '90%', height: isDragging ? 'auto' : '100%' }}
      >
        <CardContent sx={{ p: '3%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '2%' }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: '600',
                fontSize: { xs: '1rem',sm: '1.25rem' },
              }}
            >
              {freelancer.firstName} {freelancer.lastName}
            </Typography>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => onDelete(index)}>Delete</MenuItem>
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleOfferJobClick}>Offer Job</MenuItem>
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
              <IconButton size="small" onClick={() => onDelete(index)} color="primary">
                <DeleteIcon fontSize="small" />
              </IconButton>
              <EditIcon onClick={handleEditClick} color="primary" fontSize="small" />
              <Button size="small" onClick={handleOfferJobClick} color="primary">
                Offer Job
              </Button>
            </Box>
          </Box>
          <Typography
            sx={{
              mt: '2%',
              fontFamily: 'Montserrat',
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            <Box component="span" sx={{ fontWeight: '600' }}>
              Age:
            </Box>{' '}
            {freelancer.age}
          </Typography>
          <Typography
            sx={{
              mt: '2%',
              fontFamily: 'Montserrat',
              whiteSpace: 'normal',
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            <Box component="span" sx={{ fontWeight: '600' }}>
              Skills:
            </Box>{' '}
            {freelancer.skills.join(', ')}
          </Typography>
          {proposals.length > 0 && (
            <Box sx={{ position: 'absolute', bottom: '2%', right: '2%' }}>
              <Button size="small" onClick={handleShowProposals} color="primary">
                View offers ({proposals.length})
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth >
        <AddOrderForm addProject={handleAddProposal} onSuccess={handleCloseModal} />
      </Dialog>
      <Dialog
        open={showProposals}
        onClose={handleCloseProposals}
        maxWidth={false}
        
        PaperProps={{
          style: {
            width: '80%',
            height: '70%',
            maxWidth: 'none',
            maxHeight: 'none',
            
          },
        }}
      >
        <ProposalList proposals={proposals} />
      </Dialog>
    </Box>
  );
};

export default FreelancerList;