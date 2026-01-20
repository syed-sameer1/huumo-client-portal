import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Search } from 'lucide-react';

export const SearchFilter = () => {
  return (
    <InputGroup className="w-98.75">
      <InputGroupInput placeholder="Search by name" />
      <InputGroupAddon align="inline-end">
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};
