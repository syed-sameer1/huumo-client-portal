import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Search } from 'lucide-react';

export const InboxSearch = () => {
  return (
    <InputGroup className="w-98.75">
      <InputGroupInput placeholder="Search" />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};
