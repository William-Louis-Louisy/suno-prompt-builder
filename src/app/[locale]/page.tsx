import { useTranslations } from 'next-intl';
import VoicePanel from '@/components/panels/VoicePanel';
import ExportPanel from '@/components/export/ExportPanel';
import StylesPanel from '@/components/panels/StylesPanel';
import PageHeading from '@/components/commons/PageHeading';
import ArtistsPanel from '@/components/artists/ArtistsPanel';
import StructurePanel from '@/components/structure/StructurePanel';
import MaxWidthWrapper from '@/components/commons/MaxWidthWrapper';
import SectionEditor from '@/components/section-editor/SectionEditor';
import { AdvancedOptionsPanel } from '@/components/panels/AdvancedOptionsPanel';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <MaxWidthWrapper className="mt-16 flex flex-col items-center gap-8 pt-6 pb-12">
      <div className="space-y-6">
        <PageHeading />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <StructurePanel />
          <SectionEditor />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StylesPanel />
          <VoicePanel />
          <ArtistsPanel />
          {/* <AdvancedOptionsPanel /> */}
        </div>

        <ExportPanel />
      </div>
    </MaxWidthWrapper>
  );
}
