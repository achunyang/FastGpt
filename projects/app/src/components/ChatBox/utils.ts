import { SystemInputEnum } from '@/constants/app';
import { FlowModuleTypeEnum } from '@/constants/flow';
import { getChatModel } from '@/service/utils/data';
import { AppModuleItemType, VariableItemType } from '@/types/app';

export const getGuideModules = (modules: AppModuleItemType[]) => {
  const guideModules = modules.find((item) => item.flowType === FlowModuleTypeEnum.userGuide);

  const welcomeText: string =
    guideModules?.inputs?.find((item) => item.key === SystemInputEnum.welcomeText)?.value || '';

  const variableModules: VariableItemType[] =
    guideModules?.inputs.find((item) => item.key === SystemInputEnum.variables)?.value || [];

  return {
    welcomeText,
    variableModules
  };
};
export const getChatModelNameList = (modules: AppModuleItemType[]): string[] => {
  const chatModules = modules.filter((item) => item.flowType === FlowModuleTypeEnum.chatNode);
  return chatModules
    .map(
      (item) => getChatModel(item.inputs.find((input) => input.key === 'model')?.value)?.name || ''
    )
    .filter((item) => item);
};
