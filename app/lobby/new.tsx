import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserSessionStore } from '@/hooks/useUserSessionStore';
import { format } from 'date-fns';
import { ThemedButton } from '@/components/ThemedButton';
import { useMatchList } from '@/hooks/useMatchList';

const schema = yup.object({
  name: yup.string().required('Nome da partida é obrigatório'),
});

export default function NewMatchScreen() {
  const { username } = useUserSessionStore((state) => state);
  const { createMatch, creatingMatch } = useMatchList();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: `Partida de ${username} ${format(new Date(), 'dd-MM-yyyy HH:mm')}`,
    },
  });

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type='title'>Nova Partida</ThemedText>
      <ThemedInput name='name' control={control} />
      <ThemedButton
        title='CRIAR PARTIDA'
        onPress={handleSubmit(createMatch)}
        loading={creatingMatch}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 100,
    padding: 20,
    gap: 10,
  },
});
