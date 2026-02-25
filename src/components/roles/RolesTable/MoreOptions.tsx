import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import type { User } from '@/service/users';
import { EditRoleModal } from '../edit-role-modal';
import { DeleteRoleModal } from '../delete-role-modal';
import { ActivateRoleModal } from '../activate-role-modal';
import { useUpdateUser } from '@/hooks/client';
import { useQueryClient } from '@tanstack/react-query';
import { DeactivateRoleModal } from '../deactivate-role-modal';

export const MoreOptions = ({ user }: { user: User }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);

  const [deactivateOpen, setDeactivateOpen] = useState(false);
  
  const handleDeactivate = () => {
    setDeactivateOpen(true);
  };

  const queryClient = useQueryClient();
  const { mutate: updateUser } = useUpdateUser();

  const isActive = (user.status ?? '').toLowerCase() === 'active';

  const handleActivateOrDeactivate = () => {
    if (isActive) {
      setDeactivateOpen(true);
    } else {
      setActivateOpen(true);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-49 mr-4 mt-5">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleActivateOrDeactivate();
              }}
              className="text-secondary-foreground text-sm py-1.5 h-8.25"
            >
              {isActive ? 'Deactivate' : 'Activate'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setEditOpen(true);
              }}
              className="text-secondary-foreground text-sm py-1.5 h-8.25"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setDeleteOpen(true);
              }}
              className="text-destructive text-sm py-1.5 h-8.25"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditRoleModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialName={user.name}
        initialEmail={user.email}
      />

      <DeleteRoleModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        userId={user.id}
      />

      {user.tempToken && (
        <ActivateRoleModal
          open={activateOpen}
          onClose={() => setActivateOpen(false)}
          token={user.tempToken}
        />
      )}
      {deactivateOpen && (
        <DeactivateRoleModal
          open={deactivateOpen}
          onClose={() => setDeactivateOpen(false)}
          user={user}
        />
      )}
    </>
  );
};

