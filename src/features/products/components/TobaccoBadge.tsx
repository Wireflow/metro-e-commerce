import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

const TobaccoBadge = ({ isTobacco }: { isTobacco: boolean }) => {
  return (
    <Badge
      variant={isTobacco ? 'warning' : 'secondary'}
      className="inline-flex h-5 w-fit items-center gap-0.5 whitespace-nowrap rounded-sm px-2"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-0.5"
      >
        {isTobacco && <Flame className="h-3 w-3" />}
        <span className="text-[10px] font-medium">{isTobacco ? 'Tobacco' : 'Non-Tobacco'}</span>
      </motion.div>
    </Badge>
  );
};

export default TobaccoBadge;
